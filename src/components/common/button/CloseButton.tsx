import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface ICloseButton {
  onPress: () => void;
}
const CloseButton = (props: ICloseButton) => {
  return (
    <TouchableOpacity onPress={() => props.onPress()}>
      <Icon name={'close'} size={24} />
    </TouchableOpacity>
  );
};
export default CloseButton;
