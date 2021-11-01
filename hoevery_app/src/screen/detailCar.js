import React, { useState, createRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import { Input } from 'react-native-elements';
import Cookie from 'react-native-cookie';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';

import { COLORS, SIZES, FONTS, icons, images } from '../constants';
import { styles } from '../style';

const Header = () => {
  return (
    <View style={styles1.header}>
      <View style={styles1.header_text}>
        <Text style={styles1.text_header}> รายละเอียดข้อมูลรถ</Text>
      </View>
    </View>
  );
};
const detailCar = ({ navigation }) => {
  const [text_excavator_name, setText_excavator_name] = useState();
  const [create, setCreate] = useState();
  const [size, setSize] = useState();
  const [pickerTypeValue, setPickerTypeValue] = useState("NULL");
  const [Price_daily, setPrice_daily] = useState();
  const [Price_weekly, setPrice_weekly] = useState();
  const [Price_monthly, setPrice_monthly] = useState();
  const [func, setFunc] = useState();
  const [image, setImage] = useState('');

  const [singleFile, setSingleFile] = useState(null);


  const onChangeName = textValue => setText_excavator_name(textValue);
  const onChangeSize = textValue => setSize(textValue);
  const onChangeDaily = textValue => setPrice_daily(textValue);
  const onChangeWeekly = textValue => setPrice_weekly(textValue);
  const onChangeMonthly = textValue => setPrice_monthly(textValue);
  const onChangeFunc = textvalue => setFunc(textvalue);

  const InsertExData = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const cookieUsername = await Cookie.get('203.150.107.212');
    setCreate(cookieUsername['username']);

    console.log("name : ", text_excavator_name);
    console.log("create by : ", cookieUsername['username']);
    console.log("size : ", size);
    console.log("type : ", pickerTypeValue);
    console.log("Daily : ", Price_daily);
    console.log("Week : ", Price_weekly);
    console.log("Monthly : ", Price_monthly);
    console.log("function : ", func);
    console.log("image : ", image);

    if (singleFile != null) {
      // If file selected then create FormData
      const fileToUpload = singleFile;

      var formdata = new FormData();
      formdata.append("uploaded_file", singleFile, singleFile.name);
      formdata.append("carname", text_excavator_name);
      formdata.append("create_by", cookieUsername['username']);
      formdata.append("type", pickerTypeValue);
      formdata.append("size", size);
      formdata.append("Daily", Price_daily);
      formdata.append("Weekly", Price_weekly);
      formdata.append("Monthly", Price_monthly);
      formdata.append("function", func);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };
      const response = await fetch('http://203.150.107.212/lessor/insert-car', requestOptions)
      const json = await response.json();
      console.log(json);
      navigation.navigate('AddCar');
      if (json.status == 1) {
        alert('Upload Successful');
      }
      else {
        // If no file selected the show alert
        alert('Please Select File first');
      }
    }
  };
  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  const chooseFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
    }).then(image => {
      console.log('image :', image);
      setImage(image);
      // image.uri = image.path;
      // image.width = image.width;
      // image.height = image.height;
      // image.mime = image.mime;
      // console.log("image after : ",image);
      // console.log('uri:', image.uri);
      // console.log('type:', image.type);
      // console.log('date:', image.dateModified);
      // console.log(image);
    });
  }
  const uploadImage = async () => {
    console.log('upload image active!')
    var formdata = new FormData();
    formdata.append("uploaded_file", image, image.uri);

    var requestOptions = {
      method: 'PUT',
      body: formdata,
      redirect: 'follow'
    };
    const cookie = await Cookie.get('203.150.107.212');
    console.log('cookie : ', cookie);
    const response = await fetch(`http://203.150.107.212/file/upload-file-car?car_id=22&username=${cookie['username']}`, requestOptions);
    console.log('response: ', response);
    const result = response.json();
    console.log('result', result);
    try {
      if (result.ret == 0) {
        // console.log(result.ret);
      }
      else {
        alert(result.msg);
      }

    } catch (err) { () => console.log(err) }

  };

  return (
    <View style={styles.container}>
      {/* header */}
      <Header />
      {/* body */}
      <View style={styles1.body}>
        <ScrollView style={styles1.scroll_view}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={
                {
                  width: 100,
                  height: 100,
                }
              }
              source={
                {
                  uri: image.uri
                }
              }
              onPress={() => { }}
              borderRadius={10}
            />
          </TouchableOpacity>
          <View style={
            {
              flex: 1,
              backgroundColor: COLORS.white,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
            }
          }>
            <TouchableOpacity style={
              {
                width: "90%",
                height: 50,
                backgroundColor: COLORS.primary,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                shadowColor: COLORS.secondary,
                shadowOffset: {
                  width: 2,
                  height: 3,
                },
                shadowOpacity: 1.22,
                shadowRadius: 1.22,
                elevation: 10,
              }
            }
              onPress={selectFile}
            >
              <Text style={{ fontSize: 18 }}>เพิ่มรูปรถจากอัลบั้ม </Text>
            </TouchableOpacity>
            <TouchableOpacity style={
              {
                width: "90%",
                height: 50,
                backgroundColor: COLORS.primary,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                shadowColor: COLORS.secondary,
                shadowOffset: {
                  width: 2,
                  height: 3,
                },
                shadowOpacity: 1.22,
                shadowRadius: 1.22,
                elevation: 10,
              }
            }
              onPress={uploadImage}
            >
              <Text style={{ fontSize: 18 }}>อัพโหลด</Text>
            </TouchableOpacity>
          </View>
          <Input
            placeholder="ชื่อรถขุดเจาะ"
            renderErrorMessage={true}
            leftIcon={{ type: 'font-awesome', name: 'bus' }}
            onChangeText={onChangeName}></Input>
          <Input
            placeholder="ขนาด"
            renderErrorMessage={true}
            leftIcon={{ type: 'font-awesome', name: 'expand' }}
            onChangeText={onChangeSize}></Input>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#a9a9a9' }}>
            {' '}
            ประเภทของรถขุดเจาะ {' '}
          </Text>
          <Picker
            style={styles1.picker}
            selectedValue={pickerTypeValue}
            onValueChange={itemValue => setPickerTypeValue(itemValue)}>
            <Picker.Item label="Select..." value="none" />
            <Picker.Item label="Crawler" value="Crawler" />
            <Picker.Item label="Drag Line" value="Drag Line" />
            <Picker.Item label="Suction" value="Suction" />
            <Picker.Item label="Skid Steel" value="Skid Steel" />
            <Picker.Item label="Long Reach" value="Long Reach" />
            <Picker.Item label="Mini Crawler" value="Mini Crawler" />
          </Picker>
          <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#000' }}>
            {' '}
            ราคา :{' '}
          </Text>
          <Input
            placeholder=" รายวัน $"
            renderErrorMessage={true}
            leftIcon={{ type: 'font-awesome', name: 'money' }}
            keyboardType="decimal-pad"
            onChangeText={onChangeDaily}></Input>
          <Input
            placeholder=" รายอาทิตย์ $"
            renderErrorMessage={true}
            leftIcon={{ type: 'font-awesome', name: 'money' }}
            keyboardType="decimal-pad"
            onChangeText={onChangeWeekly}></Input>
          <Input
            placeholder=" รายเดือน $"
            renderErrorMessage={true}
            leftIcon={{ type: 'font-awesome', name: 'money' }}
            keyboardType="decimal-pad"
            onChangeText={onChangeMonthly}>
          </Input>
          <Input
            placeholder="รายละเอียด"
            label="คุณสมบัติ"
            renderErrorMessage={true}
            leftIcon={{ type: 'font-awesome', name: 'gear' }}
            fontSize={15}
            onChangeText={onChangeFunc}
            multiline={false}
          >
          </Input>
        </ScrollView>
      </View>
      {/* footer */}
      <View style={styles1.footer}>
        <TouchableOpacity
          style={styles1.next_button}
          onPress={() => InsertExData()}
        >
          <Text style={{ fontSize: 18 }}>บันทึกข้อมูล</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: COLORS.white,
    flex: 0.11,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 1.22,
    elevation: 70,
    borderColor: COLORS.gray,
    borderRadius: 10,
    borderTopWidth: 0.4,
    padding: 5,
  },
  body: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  footer: {
    flex: 0.12,
    backgroundColor: COLORS.white,
    padding: 15,
  },
  box_view: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  inputtext: {
    padding: 15,
    fontSize: 18,
    backgroundColor: COLORS.white,
  },
  header_text: {
    padding: 5,
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  scroll_view: {
    width: '90%',
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    paddingTop: 30,
    shadowColor: COLORS.white,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 1.22,
    elevation: 40,
  },
  text_header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkgreen,
    padding: 10,
  },
  inputtext: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  picker: {
    alignSelf: 'center',
    width: '100%',
    height: 50,
    borderColor: COLORS.black,
    borderWidth: 10,
    backgroundColor: COLORS.white,
  },
  next_button: {
    flex: 0.7,
    padding: 5,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    borderRadius: 12,
  },
});

export default detailCar;
