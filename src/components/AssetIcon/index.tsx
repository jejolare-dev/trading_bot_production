import TradeIcon from "@/assets/img/icons/trade_tsds.svg";
import ZanoIcon from "@/assets/img/icons/zano.svg";
import BanditIcon from "@/assets/img/icons/bandit.svg";

const getAssetIcon = (ticker: string, width = 18, height = 18) => {
    switch (ticker) {
        case "ZANO": 
            return <ZanoIcon width={width} height={height} />;
        case "BANDIT":
            return <BanditIcon width={width} height={height} />;
        default:
            return <TradeIcon width={width} height={height} />;
    }
}

export default getAssetIcon;