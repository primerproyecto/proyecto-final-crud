import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Key, UserX } from "react-feather";
import { ChangePassword, FormProfile } from "../components";
import { useDeleteUser } from "../hooks";

export const Profile = () => {
  const [changeRender, setChangeRender] = useState(true);
  const { user, setUser } = useAuth();
  return (
    <div>
      <>
        <div className="flexContainer-ai-center">
          <a
            href="#"
            className="iconNav"
            onClick={() => setChangeRender(false)}
          >
            {" "}
            <Key />
            Cambiar contraseña
          </a>
          <a href="#" className="iconNav" onClick={() => setChangeRender(true)}>
            Cambiar datos
          </a>
          <a
            href="#"
            className="iconNav"
            onClick={() => useDeleteUser(setUser)}
          >
            <UserX /> Delete user
          </a>
        </div>
        <div className="fluidContainerProfile">
          {changeRender ? <FormProfile /> : <ChangePassword />}
        </div>
      </>
    </div>
  );
};
