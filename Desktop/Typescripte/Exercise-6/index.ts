enum UserRole {
  SuperAdmin = "superadmin",
  Moderator = "moderator",
  Viewer = "viewer"
}

function canEdit(role: UserRole): boolean {
  if (role === UserRole.Viewer) {
    return false;
  }
  return true;
}


console.log(canEdit(UserRole.SuperAdmin)); // true
console.log(canEdit(UserRole.Moderator));  // true
console.log(canEdit(UserRole.Viewer));     // false

        // Type Assertion


const submitBtn = document.querySelector("#submit-btn") as HTMLButtonElement;


if (submitBtn) {
  submitBtn.disabled = true;
}