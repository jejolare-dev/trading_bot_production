import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { fetchUserAssets } from "../trading/page";
import MessageBanner from "@/components/MessageBanner";

const IncorrectSetupPage = async () => {
    await checkServerSetup();

    return <MessageBanner message={"Server-side wallet not responding!"} />
}

export default IncorrectSetupPage;

async function checkServerSetup() {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
        redirect('/');
    }

    const assets = await fetchUserAssets(token);

    if (assets?.success) {
        redirect("/trading");
    }
}