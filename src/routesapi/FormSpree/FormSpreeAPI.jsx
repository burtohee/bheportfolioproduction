import { postRequest } from "../../utils/API/index";

export function submitForSpreeForm(requestObj) {
  const { url, headers, dataSend } = { ...requestObj };
  return postRequest(url, headers, dataSend);
}
