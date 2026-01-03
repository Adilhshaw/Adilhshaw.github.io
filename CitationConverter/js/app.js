document.addEventListener("DOMContentLoaded", () => {

  const convertBtn = document.getElementById("convert");
  const copyBtn = document.getElementById("copyRich");

  convertBtn.addEventListener("click", async () => {

    const input = document.getElementById("input").value.trim();
    const style = document.getElementById("style").value;
    const output = document.getElementById("output");

    output.innerHTML = "Processing…";

    try {
      const metadata = await fetchMetadata(input);
      const cslData = makeCSL(metadata);
      const result = await formatCitation(cslData, style);
      output.innerHTML = result;
    } catch (err) {
      console.error(err);
      output.innerHTML = "Error: unable to generate citation.";
    }
  });

  copyBtn.addEventListener("click", () => {
    const range = document.createRange();
    range.selectNodeContents(document.getElementById("output"));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    try {
  document.execCommand("copy");
  selection.removeAllRanges();

  const status = document.getElementById("copyStatus");
  status.style.display = "inline";
  setTimeout(() => status.style.display = "none", 1500);

} catch (err) {
  console.error("Copy failed", err);
}

    
   
  });

});
