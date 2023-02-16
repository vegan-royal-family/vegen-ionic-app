import styled from "@emotion/styled";
import { ReactComponent as Apple } from "assets/icon/apple.svg";
import { ReactComponent as Google } from "assets/icon/google.svg";
import { ReactComponent as Kakao } from "assets/icon/kakao.svg";
import { ReactComponent as Aiming } from "assets/icon/aiming.svg";
import { ReactComponent as Plus } from "assets/icon/plus.svg";
import { ReactComponent as Left } from "assets/icon/left.svg";
import { ReactComponent as Right } from "assets/icon/right.svg";
import { ReactComponent as Down } from "assets/icon/down.svg";
import { ReactComponent as Search } from "assets/icon/search.svg";
import { ReactComponent as CloseSmall } from "assets/icon/close-small.svg";

type IconProps = {
  className?: string;
  icon: string;
  size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl";
  fill?: string;
};

const IconWrapper = styled.div<{ size: string | number; fill?: string }>`
  width: ${(p) => `${p.size}px`};
  height: ${(p) => `${p.size}px`};
  svg {
    path {
      fill: ${(p) => p.fill} !important;
    }
  }
`;

export default function Icon({
  className,
  icon,
  size = "md",
  fill,
}: IconProps) {
  const SIZES = {
    xxs: 12,
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
  };

  const args = {
    className,
    width: SIZES[size],
    height: SIZES[size],
    fill,
  };

  let iconSvg;
  switch (icon) {
    case "apple":
      iconSvg = <Apple {...args} />;
      break;
    case "aiming":
      iconSvg = <Aiming {...args} />;
      break;
    // case "attention-filled":
    //   return <AttentionFilled {...args} />;
    // case "attention":
    //   return <Attention {...args} />;
    // case "check-one":
    //   return <CheckOne {...args} />;
    // case "check-one-filled":
    //   return <CheckOneFilled {...args} />;
    // case "circle-white":
    //   return <CircleWhite {...args} />;
    // case "circle":
    //   return <Circle {...args} />;
    // case "close-one-filled":
    //   return <CloseOneFilled {...args} />;
    // case "close-one":
    //   return <CloseOne {...args} />;
    case "close-small":
      return <CloseSmall {...args} />;
    // case "delete":
    //   return <Remove {...args} />;
    // case "double-left":
    //   return <DoubleLeft {...args} />;
    // case "double-right":
    //   return <DoubleRight {...args} />;
    case "down":
      iconSvg = <Down {...args} />;
      break;
    case "google":
      iconSvg = <Google {...args} />;
      break;
    // case "home":
    //   return <Home {...args} />;
    case "kakao":
      iconSvg = <Kakao {...args} />;
      break;
    // case "left-small":
    //   return <LeftSmall {...args} />;
    case "left":
      iconSvg = <Left {...args} />;
      break;
    // case "like":
    //   return <Like {...args} />;
    // case "naver":
    //   return <Naver {...args} />;
    // case "phone-telephone":
    //   return <PhoneTelephone {...args} />;
    // case "play-cycle":
    //   return <PlayCycle {...args} />;
    case "plus":
      iconSvg = <Plus {...args} />;
      break;
    // case "preview-close-one":
    //   return <PreviewCloseOne {...args} />;
    // case "preview-close":
    //   return <PreviewClose {...args} />;
    // case "preview-open":
    //   return <PreviewOpen {...args} />;
    // case "redo":
    //   return <Redo {...args} />;
    case "right":
      iconSvg = <Right {...args} />;
      break;
    // case "setting-config":
    //   return <SettingConfig {...args} />;
    // case "setting-two":
    //   return <SettingTwo {...args} />;
    // case "star-filled-half":
    //   return <StarFilledHalf {...args} />;
    // case "star-filled":
    //   return <StarFilled {...args} />;
    // case "star":
    //   return <Star {...args} />;
    // case "up":
    //   return <Up {...args} />;
    // case "checked":
    //   return <Checked {...args} />;
    default:
      iconSvg = <div />;
      break;
  }

  return (
    <IconWrapper fill={fill} size={args.width}>
      {iconSvg}
    </IconWrapper>
  );
}
