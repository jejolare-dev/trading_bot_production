import AuthData from "../interfaces/bodies/user/AuthData";
import axios from "axios";

async function validateWallet(authData: AuthData) {

    async function fetchZanoApi(method: string, params: any) {
        return await axios.post(
            'http://127.0.0.1:11211/json_rpc', 
            {
                "id": 0,
                "jsonrpc": "2.0",
                "method": method,
                "params": params,
            }
        ).then(res => res.data);    
    }
    
    const { message, address, alias, signature } = authData;

    if (!message || !alias || !signature) {
        return false;
    }

    const response = await fetchZanoApi(
        'validate_signature', 
        {
            "buff": Buffer.from(message).toString("base64"),
            "alias": alias,
            "sig": signature
        }
    );

    const aliasOk = response?.result?.status === 'OK';

    if (!aliasOk) {
        return false;
    }

    const aliasDetailsResponse = await fetchZanoApi(
        'get_alias_details', 
        {
            "alias": alias,
        }
    );

    const aliasDetails = aliasDetailsResponse?.result?.alias_details;
    const aliasAddress = aliasDetails?.address;

    const addressOk = !!aliasAddress && aliasAddress === address;

    return aliasOk && addressOk;
}

export default validateWallet;