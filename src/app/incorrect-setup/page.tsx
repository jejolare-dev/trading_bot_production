import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import MessageBanner from '@/components/MessageBanner';
import { fetchUserAssets } from '../trading/page';

const IncorrectSetupPage = async () => {
    await checkServerSetup();

    return <MessageBanner message={'Server-side wallet not responding!'} />;
};

export default IncorrectSetupPage;

async function checkServerSetup() {
    const token = (await cookies()).get('token')?.value;

    if (!token) {
        redirect('/');
    }

    const assets = await fetchUserAssets(token);

    if (assets?.success) {
        redirect('/trading');
    }
}
