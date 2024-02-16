function useAutoReSizeInput() {
  const innitAutoResize = (node: HTMLElement) => {
    node.addEventListener("keyup", () => {
      node.style.cssText = "height:40px; overflow: hidden;";
      node.style.cssText = `height: ${node.scrollHeight}px ; overflow: auto`;
    });
    node.style.cssText = "height:40px; overflow: hidden;";
    node.style.cssText = `height: ${node.scrollHeight}px ; overflow: auto`;
  };

  //node đã bị destroy ở useEffect thì ko cần sài
  const destroyAutoResize = (node: HTMLElement) => {
    node.removeEventListener("keyup", () => {
      console.log("DestroyAutoResize");
    });
  };


  return {
    innitAutoResize,
    destroyAutoResize,
  };
}

export default useAutoReSizeInput;
