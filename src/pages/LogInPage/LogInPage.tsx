import { useState } from "react";
import styles from "@/pages/LogInPage/LogInPageStyles.module.css";

import Pannel3DLoginPage from "@/components/Pannel3DLoginPage";
import { Pannel3DLoginPageDataType } from '@/entities/Pannel3DLoginPageDataType';

import { useAuthenticationContext } from "@/contexts/AuthenticationContext/AuthenticationContext";
import { useNavigate } from "react-router";
function LogInPage() {
  const [inputsChecked, setInputsChecked] = useState<Pannel3DLoginPageDataType>({
    password: false,
    longerSession: false,
  });

  const {login} = useAuthenticationContext()
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    try {
      await login();
      navigate("/home");
    } catch (err) {
      // setError("Invalid email or password");
    }
  };

  return (
    <div className={styles.LogInPageContainer}>
      <Pannel3DLoginPage
        datas={inputsChecked}
        datasSet={setInputsChecked}
      ></Pannel3DLoginPage>

      <button onClick={handleSubmit}>login</button>

    </div>
  );
}

export default LogInPage;
