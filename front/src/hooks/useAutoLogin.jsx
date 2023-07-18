import { set } from "react-hook-form";
import { autoLoginUser } from "../services/API_user/user.service";
import { Navigate } from "react-router-dom";

export const useAutoLogin = async (allUser, userLogin, setOkCheck) => {
  try {
    const { email, password, rol } = allUser?.data?.user;

    const customFormData = {
      email,
      password,
      rol,
    };
    const setData = await autoLoginUser(customFormData);
    if (setData?.status == 200) {
      const dataCustom = {
        token: setData.data.token,
        user: setData.data.user.name,
        email: setData.data.user.email,
        image: setData.data.user.image,
        check: setData.data.user.check,
        rol: setData.data.user.rol,
      };

      const dataString = JSON.stringify(dataCustom);
      userLogin(dataString);
      setOkCheck(() => true);
    } else {
    }
  } catch (error) {
    console.log(error);
  }
};
