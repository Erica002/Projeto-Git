import {StyleSheet} from 'react-native';
import Theme from './Theme';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 10,
        backgroundColor: Theme.colors.background,
    },

    title: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
    },
 
    buttonText: {
        fontSize: 20,
        textAlign: 'center'
    },

    button: {
        paddingVertical: 15,
        paddingHorizontal: 35,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 20,
      },

      droidSafeArea: {
        flex: 1,
        paddingTop: 40,
    },
});