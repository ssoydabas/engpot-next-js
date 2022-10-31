import styles from "./DeleteUser.module.css";

import Button from "../../../ui/components/button/Button";

function DeleteUser({
  userId,
  setUserToManage,
  refreshUsersHandler,
  dispatch,
  feedbackActions,
  http,
}) {
  const deleteHandler = () => {
    const data = {
      userId,
    };
    const requestConfig = {
      url: `${process.env.API_URL}/v1/admin/deleteUser`,
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authenticationToken")}`,
      },
      body: data,
    };

    const dataProcessingLogic = ({ message }) => {
      http.setIsLoading(false);
      dispatch(feedbackActions.setMessage(message));
      setUserToManage(false);
      refreshUsersHandler();
    };

    http.sendRequest(requestConfig, dataProcessingLogic);
  };

  return (
    <div className={styles["delete-button"]}>
      <Button type={"button"} onClick={deleteHandler}>
        Delete User
      </Button>
    </div>
  );
}

export default DeleteUser;
