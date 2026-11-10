"use strict";
var UserRole;
(function (UserRole) {
    UserRole["SuperAdmin"] = "superadmin";
    UserRole["Moderator"] = "moderator";
    UserRole["Viewer"] = "viewer";
})(UserRole || (UserRole = {}));
function canEdit(role) {
    if (role === UserRole.Viewer) {
        return false;
    }
    return true;
}
console.log(canEdit(UserRole.SuperAdmin)); // true
console.log(canEdit(UserRole.Moderator)); // true
console.log(canEdit(UserRole.Viewer)); // false
// Type Assertion
const submitBtn = document.querySelector("#submit-btn");
if (submitBtn) {
    submitBtn.disabled = true;
}
