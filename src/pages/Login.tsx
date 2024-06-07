import { useEffect } from "react";

function Login() {
  const handleCredentialResponse = (response: any) => {
    console.log('response', response)
  }
  useEffect(() => {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: "571353765230-ijfdjl6da0nsvj2bcui6o73rkpl2k4cq.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    // @ts-ignore
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    // @ts-ignore
    google.accounts.id.prompt(); // also display the One Tap dialog
  }, [])
  return (
    <div>
      Login
      <div id="buttonDiv"></div>
    </div>
  );
}

export default Login;
