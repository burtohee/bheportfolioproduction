import { useState } from "react";
import styles from "@/pages/LogInPage/LogInPageStyles.module.css";

import Pannel3DLoginPage from "@/components/Pannel3DLoginPage";
import { Pannel3DLoginPageDataType } from '@/entities/Pannel3DLoginPageDataType';


function LogInPage() {
  const [inputsChecked, setInputsChecked] = useState<Pannel3DLoginPageDataType>({
    password: false,
    longerSession: false,
  });

  return (
    <div className={styles.LogInPageContainer}>
      <Pannel3DLoginPage
        datas={inputsChecked}
        datasSet={setInputsChecked}
      ></Pannel3DLoginPage>
    </div>
  );
}

export default LogInPage;
