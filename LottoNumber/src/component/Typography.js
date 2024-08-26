import React from "react";
import { Text as RNText } from "react-native";
import PropTypes from "prop-types";

export const Typography = (props) => {
  return (
    <RNText style={{ color: props.color, fontSize: props.fontSize }}>
      {props.children}
    </RNText>
  );
};

//클래스형 컴포넌트
// export class Typography extends React.Component {
//   render() {
//     return (
//       <RNText
//         style={{
//           color: this.props.color,
//           fontSize: this.props.fontSize,
//           fontWeight: this.props.fontWeight,
//         }}
//       >
//         {this.props.children}
//       </RNText>
//     );
//   }
// }

Typography.propTypes = {
  color: PropTypes.string,
  fontSize: PropTypes.number.isRequired,
  fontSize: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
};
