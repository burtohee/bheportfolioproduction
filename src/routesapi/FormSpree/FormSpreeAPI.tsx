import { postRequest } from '../../utils/API/index.tsx';

export function submitForSpreeForm(requestObj: {
    url: any;
    headers: any;
    dataSend: any;
}) {
    const { url, headers, dataSend } = { ...requestObj };
    return postRequest(url, headers, dataSend);
}
