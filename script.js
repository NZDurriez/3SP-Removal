
const staffSelect = document.getElementById("staffMember");
const roleSelect = document.getElementById("staffRole");
let staffList = [];

fetch("staff.json")
  .then(res => res.json())
  .then(data => {
    staffList = data;
    staffSelect.innerHTML = '<option value="">Select Staff Member</option>';
    data.forEach(staff => {
      const option = document.createElement("option");
      option.value = staff.id;
      option.textContent = staff.name;
      staffSelect.appendChild(option);
    });
  });

staffSelect.addEventListener("change", () => {
  const selected = staffList.find(s => s.id === staffSelect.value);
  roleSelect.innerHTML = "";
  const option = document.createElement("option");
  option.value = selected ? selected.role : "";
  option.textContent = selected ? selected.role : "";
  roleSelect.appendChild(option);
  roleSelect.disabled = false;
});

document.getElementById("generate3SP").addEventListener("click", () => {
  const idsInput = document.getElementById("discordIDs").value.trim();
  const selectedStaffId = staffSelect.value;
  const selectedStaffRole = roleSelect.value;

  if (!idsInput || !selectedStaffId) {
    alert("Please enter Discord IDs and select a staff member.");
    return;
  }

  const mentions = idsInput.split(/\s+/).map(id => `<@${id}>`).join(", ");
  const staffMention = `<@${selectedStaffId}>`;

  const message = `Kia ora ${mentions}

We're reaching out to let you know that you have successfully completed your allotted time on 3SP without any further staff actions. As a result, you have been taken off 3SP.

We appreciate the improvement in your server performance and hope this positive trend continues.

Please be aware that we keep records of 3SP participants, and if the behavior that led to your placement on 3SP resumes, you may be reinstated swiftly.

If you have any questions, feel free to ask in this ticket.

A response is optional, but if you wish to acknowledge this message, please reply with a ✅ to confirm your awareness of your removal from 3SP.

Thank you, and enjoy your time on the server!

Best regards,
${staffMention}
${selectedStaffRole}`;

  const outputBox = document.getElementById("outputFull3SP");
  outputBox.textContent = message;
  document.getElementById("fullOutputContainer").style.display = "block";
});
