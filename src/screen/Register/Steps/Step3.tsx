import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {camera, cross} from '../../../assets';
import DocumentPicker from 'react-native-document-picker';
import {RegisterationData} from '../register-types';

const Step3 = ({
  regData,
  handleRegisterData,
}: {
  regData: RegisterationData;
  handleRegisterData: (v: any) => void;
}) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const pickFile = async () => {
    try {
      const res: any = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      setFileName(res.name);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        Alert.alert('Error', 'Failed to pick file.');
      }
    }
  };

  useEffect(() => {
    handleRegisterData({...regData, fileName: fileName});
  }, [fileName]);

  return (
    <View style={{marginTop: 30}}>
      <View>
        <View style={{flexDirection: 'row', gap: 5}}>
          <Text style={styles.label}>Signup 3 of 4</Text>
        </View>
        <Text style={styles.welcomeText}>Verification</Text>
        <Text style={styles.label}>
          Attached proof of Department of Agriculture registrations i.e. Florida
          Fresh, USDA Approved, USDA Organic
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <Text
          style={{
            fontFamily: 'Be Vietnam',
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 20.45,
            textAlign: 'center',
            textDecorationLine: 'underline',
          }}>
          Attach proof of registration
        </Text>
        <TouchableOpacity
          onPress={pickFile}
          style={{
            height: 53,
            width: 53,
            borderRadius: 100,
            backgroundColor: '#D5715B',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={camera} style={{width: 23, height: 20}} />
        </TouchableOpacity>
      </View>
      <View>
        {fileName && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 48,
              paddingHorizontal: 16,
              justifyContent: 'space-between',
              backgroundColor: 'lightgrey',
              marginTop: 20,
              borderRadius: 8,
            }}>
            <Text>{fileName}</Text>
            <TouchableOpacity
              onPress={() => {
                handleRegisterData({...regData, fileName: ''});
                setFileName('');
              }}>
              <Image source={cross} style={{width: 15, height: 15}} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default Step3;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 16,
  },
  welcomeText: {
    fontFamily: 'Be Vietnam',
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 46.75,
    marginBottom: '8%',
  },
  label: {
    fontFamily: 'Be Vietnam',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 20.45,
    textAlign: 'left',
    color: '#0000004D',
  },
});
