import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textHeader: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  backgound: {
    flex: 10,
    backgroundColor: '#5F9595',
  },
  body: {
    flex: 1,
    marginRight: 45,
    marginLeft: 45,
    marginBottom: 70,
    flexDirection: 'column',
    alignItems: 'center',
  },
  SignIn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 35,
  },
  box: {
    width: 300,
    height: 350,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#ffff',
    paddingTop: 10,
  },
  form: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
  },
  textSignIn: {
    flex: 1,
    color: '#979797',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  textSignUp: {
    flex: 1,
    color: '#B9B9B9',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  socials: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 20,
    marginTop: 5,
    width: 240,
    height: 30,
  },
  socialBox: {
    width: 100,
    height: 25,
    marginRight: 10,
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 1.22,

    elevation: 2,
  },

  img: {
    marginRight: 5,
    marginLeft: 5,
    width: 22,
    height: 22,
  },
  icon: {
    marginRight: 5,
    marginLeft: 5,
    width: 25,
    height: 25,
    borderRadius: 50,
  },

  footer: {
    flex: 1,
    padding: 5,
    backgroundColor: '#4C8181',
  },
  text_header1: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 36,
  },
  text_header2: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    paddingBottom: 20,
    marginTop: 20,
    marginTop: 20,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    paddingTop: 15,
    paddingRight: 10,

    borderWidth: 1,
    borderColor: '#f2f2f2',
    borderRadius: 15,
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS == 'ios' ? 0 : -15,
    paddingLeft: 10,
    color: '#BEBBBB',
  },

  signIn: {
    width: '100%',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    fontSize: 14,
    margin: 5,
  },
  preloader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeScreen: {
    margin: 10,
  }
});

export { styles }