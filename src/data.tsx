import Campaign from './screens/Campaign';
import Reward from './screens/Reward';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CampaignIcon from '@mui/icons-material/Campaign';
export default function(){
    const data=[
        {
            id:0,
            label:"Campaign",
            img:<CampaignIcon/>,
            component:<Campaign />,
            path:"/campaign"

        },
        {
            id:1,
            label:"Reward",
            img:<EmojiEventsIcon/>,
            component:<Reward/>,
            path:"/reward"

        }
    ]
    return data
}

// export default data