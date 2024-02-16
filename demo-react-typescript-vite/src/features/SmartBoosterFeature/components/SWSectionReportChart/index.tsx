/* Packages */
import {
  ProgressBar,
  SkeletonBodyText,
  SkeletonDisplayText,
  Text,
} from "@shopify/polaris";
/* translation */
import noFile from "@swift/assets/svg/general/no-file.svg";
import { queryKeys } from "@swift/queryKeys";
import { useSmartBoosterService } from "@swift/services/smartBoosterApi";
import { IDataRecordRowOverViewReport } from "@swift/types/smartBooster";
import { formatDateYYYYMMDDStrike } from "@swift/utils/formatDate";
import { useQuery } from "@tanstack/react-query";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import useFuncSmartBooster from "../../hooks/useFuncSmartBooster";

const TODAY = new Date();
const PRIOR_DATE = new Date(new Date().setDate(TODAY.getDate() - 29));

const optionsChartDefault: Highcharts.Options = {
  chart: {
    type: "spline",
  },
  title: {
    text: "",
  },
  legend: {
    enabled: false,
  },
  tooltip: {
    shared: true,
    useHTML: true,
    backgroundColor: "#FFF",
    borderRadius: 4,
    padding: 12,
    shadow: true,
    formatter: function () {
      const timestamp = this.x ? this.x : 0;
      const title =
        "<span class='SWSectionReportCountry__chart-title pt-3'>" +
        Highcharts.dateFormat("%a %d %b", +timestamp) +
        "</span>" +
        "</b>";
      if (this.points) {
        return this.points.reduce(function (s, point) {
          return (
            s +
            " <br/> " +
            "<p class='SWSectionReportCountry__chart-des flex items-baseline justify-between gap-1'>" +
            "<span>" +
            point.series.name +
            "</span>" +
            "<span>" +
            point.y +
            "</span>" +
            "</p>"
          );
        }, "<b>" + title);
      }
      return "";
    },
  },
  plotOptions: {
    series: {
      lineWidth: 3,
      pointStart: Date.UTC(
        PRIOR_DATE.getFullYear(),
        PRIOR_DATE.getMonth(),
        PRIOR_DATE.getDate()
      ),
      pointInterval: 24 * 3600 * 1000, // one day
    },
  },

  xAxis: {
    type: "datetime",
    tickWidth: 0,
    lineColor: "#E1E3E5",
  },
  yAxis: {
    title: {
      text: "",
    },
    labels: {
      format: "{value}",
    },
  },
  series: [
    {
      type: "spline",
      name: "Users",
      color: "#0A855C",
      marker: {
        enabled: false,
      },
      // data: dataReportTotalUser.slice(0),
    },
  ],
};

function SWSectionReportCountry() {
  const { t } = useTranslation();

  const { getReportCountry, getReportUser } = useSmartBoosterService();

  const {  isAcceptUserFeature} = useFuncSmartBooster();

  const [totalUserReportCountry, setTotalUserReportCountry] = useState(0);

  const [showChart, setShowChart] = useState<TypeShowChart>(
    TypeShowChart.totalUser
  );

  const { data: dataReportCountry, isFetching: isLoadingFetchReportCountry } =
    useQuery({
      ...queryKeys.smartBoosterQueryKey.getReportCountry(),
      enabled:isAcceptUserFeature,
      queryFn: async () => {
        const { status, data } = await getReportCountry();
        if (status && data) {
          const totalUser =
            data.totals && data.totals[0].metricValues
              ? data.totals[0].metricValues[0].value
              : 0;
          setTotalUserReportCountry(Number(totalUser));
          return handleReturnDataReportCountry(data.rows ? data.rows : []);
        }
      },
    });

  const { data: dataReportUser, isFetching: isLoadingFetchReportUser } =
    useQuery({
      ...queryKeys.smartBoosterQueryKey.getReportUser(),
      enabled:isAcceptUserFeature,
      queryFn: async () => {
        const { data, status } = await getReportUser();
        if (status && data) {
          return handleReturnDataReportUser(
            data.rows && data.rows.length ? data.rows : []
          );
        }
      },
    });

  const onChangeShowChart = useCallback((showChart: TypeShowChart) => {
    setShowChart(showChart);
  }, []);

  const handleReturnDataReportCountry = useCallback(
    (data: IDataRecordRowOverViewReport[]): IDataReportCountry[] => {
      if (data.length <= 0) return [];

      const newData = data.map((item) => {
        return {
          country: item.dimensionValues[1].value,
          numberUsers: Number(item.metricValues[0].value),
        };
      });

      return newData;
    },
    []
  );

  const handleReturnDataReportUser = useCallback(
    (data: IDataRecordRowOverViewReport[]): IDataReportUser => {
      if (!data.length) {
        return {
          dataNewUser: [],
          dataTotalUser: [],
        };
      }

      let arrDataTotalUser: number[] = [];
      let arrDataUserNew: number[] = [];
      const dayOfMonth = new Date(
        PRIOR_DATE.getFullYear(),
        PRIOR_DATE.getMonth(),
        PRIOR_DATE.getDate()
      );
      while (dayOfMonth <= TODAY) {
        const priorDateFormat = formatDateYYYYMMDDStrike(dayOfMonth);

        const findDataUser = data.find((item) => {
          const dateData = item.dimensionValues[0].value.replace(
            /([0-9]{4})([0-9]{2})([0-9]{2})/,
            "$1-$2-$3"
          );
          return dateData === priorDateFormat;
        });

        if (findDataUser) {
          arrDataTotalUser = [
            ...arrDataTotalUser,
            Number(findDataUser.metricValues[0].value),
          ];

          arrDataUserNew = [
            ...arrDataUserNew,
            Number(findDataUser.metricValues[1].value),
          ];
        } else {
          arrDataTotalUser = [...arrDataTotalUser, 0];
          arrDataUserNew = [...arrDataUserNew, 0];
        }

        dayOfMonth.setDate(dayOfMonth.getDate() + 1);
      }

      return {
        dataNewUser: arrDataUserNew,
        dataTotalUser: arrDataTotalUser,
      };
    },
    []
  );

  const percentNumberNumberAndTotal = useCallback(
    (number: number, total: number) => {
      return (number / total) * 100;
    },
    []
  );

  const displayReportUser = useMemo(
    () => (
      <div className="sw__wp-box p-5">
        <div className="flex mb-5 items-end justify-between">
          <div className="flex">
            <button
              onClick={() => {
                onChangeShowChart(TypeShowChart.totalUser);
              }}
              className={`SWSectionReportCountry__btn ${
                showChart === TypeShowChart.totalUser && "active"
              } `}
            >
              {t("smart_booster_page.section_report_chart.btn_user_total")}
            </button>
            <button
              onClick={() => {
                onChangeShowChart(TypeShowChart.userNew);
              }}
              className={`SWSectionReportCountry__btn ${
                showChart === TypeShowChart.userNew && "active"
              }`}
            >
              {t("smart_booster_page.section_report_chart.btn_new_user")}
            </button>
          </div>
          <Text as="span" color="subdued">
            {t("smart_booster_page.txt_last_time", {
              day: 30,
            })}
          </Text>
        </div>
        {(showChart === TypeShowChart.totalUser &&
          dataReportUser &&
          dataReportUser.dataTotalUser.length) ||
        (showChart === TypeShowChart.userNew &&
          dataReportUser &&
          dataReportUser.dataNewUser.length) ? (
          <div className="SWSectionReportCountry__chart">
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                ...optionsChartDefault,
                series: [
                  {
                    type: "spline",
                    name: "Users",
                    color: "#0A855C",
                    marker: {
                      enabled: false,
                    },
                    data:
                      showChart === TypeShowChart.totalUser
                        ? [...dataReportUser.dataTotalUser]
                        : [...dataReportUser.dataNewUser],
                  },
                ],
              }}
              // ref={chartComponentRef}
            />
          </div>
        ) : (
          <div
            className="flex items-center	justify-center"
            style={{
              height: " 212px",
            }}
          >
            <img src={noFile} alt="" />
          </div>
        )}
      </div>
    ),
    [t,showChart, dataReportUser]
  );

  const displayReportCountry = useMemo(
    () => (
      <div className="sw__wp-box p-5">
        <div className="flex justify-between pb-5">
          <Text as="span" color="subdued">
            {t("smart_booster_page.section_report_country.txt_country")}
          </Text>
          <Text as="span" color="subdued">
            {t("smart_booster_page.section_report_country.txt_users")}
          </Text>
        </div>
        {dataReportCountry && dataReportCountry.length > 0 ? (
          <div className="SWSectionReportCountry__list flex flex-col gap-3">
            {dataReportCountry.map((item) => (
              <div key={item.country} className="SWSectionReportCountry__item">
                <div className="flex justify-between pb-1">
                  <Text as="h4" variant="headingXs">
                    {item.country}
                  </Text>
                  <Text as="span" color="subdued">
                    {item.numberUsers}
                  </Text>
                </div>
                <ProgressBar
                  color="success"
                  progress={percentNumberNumberAndTotal(
                    item.numberUsers,
                    totalUserReportCountry
                  )}
                  size="small"
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="flex items-center	justify-center"
            style={{ height: "219px" }}
          >
            <img src={noFile} alt="" />
          </div>
        )}
      </div>
    ),
    [t,totalUserReportCountry, dataReportCountry]
  );

  const eleLoading = useMemo(
    () => (
      <div className="SWSectionReportCountry flex gap-5">
        <div className="SWSectionReportCountry__left">
          <div className="sw__wp-box p-5">
            <div className="flex gap-1 pb-5">
              <span
                style={{
                  width: "100px",
                }}
              >
                <SkeletonDisplayText size="small" />
              </span>
              <span
                style={{
                  width: "100px",
                }}
              >
                <SkeletonDisplayText size="small" />
              </span>
            </div>
            <SkeletonBodyText lines={10} />
          </div>
        </div>
        <div className="SWSectionReportCountry__right">
          <div className="sw__wp-box p-5">
            <div className="flex justify-between pb-5">
              <span
                style={{
                  width: "100px",
                }}
              >
                <SkeletonDisplayText size="small" />
              </span>
              <span
                style={{
                  width: "100px",
                }}
              >
                <SkeletonDisplayText size="small" />
              </span>
            </div>
            <SkeletonBodyText lines={10} />
          </div>
        </div>
      </div>
    ),
    []
  );

  if (isLoadingFetchReportCountry || isLoadingFetchReportUser)
    return eleLoading;

  return (
    <div className="SWSectionReportCountry flex gap-5">
      <div className="SWSectionReportCountry__left">{displayReportUser}</div>
      <div className="SWSectionReportCountry__right">
        {displayReportCountry}
      </div>
    </div>
  );
}

interface IDataReportCountry {
  country: string;
  numberUsers: number;
}

interface IDataReportUser {
  dataTotalUser: number[];
  dataNewUser: number[];
}

enum TypeShowChart {
  totalUser = "totalUser",
  userNew = "userNew",
}

export default SWSectionReportCountry;
