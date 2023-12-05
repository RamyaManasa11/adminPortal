import { Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";

const TitleSubTitle = ({
  title='',
  subTitle='',
  titleColor = '',
  subTitleColor = '#89909a',
  toolTipIcon = <></>,
  toolTipText = '',
}) => {
  return (
    <Box>
      {title && (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          textTransform={'uppercase'}
          sx={{ color: titleColor, textTransform: 'capitalize', fontSize: "h6medium" }}
        >
          {title}
        </Typography>
        <Tooltip title={toolTipText} placement='top'>
          {toolTipIcon}
        </Tooltip>
      </Box>
      )}
      {subTitle && (
      <Box>
        <Typography sx={{ color: subTitleColor, fontSize: "small" }}>
          {subTitle}
        </Typography>
      </Box>
      )}
    </Box>
  );
};
export default TitleSubTitle;
