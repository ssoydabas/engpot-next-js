const constructNavLinks = (status, path) => {
  const navigationLinks = [];

  if (status === "student") {
    navigationLinks.push({
      title: "Student",
      path: "/student",
    });
  }
  if (status === "teacher") {
    navigationLinks.push({
      title: "Teacher",
      path: "/teacher",
    });
    navigationLinks.push({
      title: "Schedule",
      path: "/schedule",
    });
  }
  if (status === "admin") {
    navigationLinks.push({
      title: "Admin",
      path: "/admin",
    });
  }

  return navigationLinks;
};

export default constructNavLinks;
