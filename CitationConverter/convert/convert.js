document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("convertCitation");

  btn.addEventListener("click", async () => {

    const input = document.getElementById("convertInput").value.trim();
    const style = document.getElementById("convertStyle").value;
    const output = document.getElementById("convertOutput");

    output.innerHTML = "Processing…";

    try {
      const cslData = parseCitationText(input);
      const result = await formatCitation(cslData, style);
      output.innerHTML = result;
    } catch (err) {
      console.error(err);
      output.innerHTML = "Unable to convert this citation.";
    }

  });

});
