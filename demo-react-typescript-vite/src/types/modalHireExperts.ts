export enum EFormHireExperts{
    number_of_tickets = "number_of_tickets",
    extra_price="extra_price",
    // total="total"
}

export interface IFormHireExperts{
    [EFormHireExperts.number_of_tickets]: string,
    [EFormHireExperts.extra_price]: string,
    // [EFormHireExperts.total]: number,
}