import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RegisterationData} from '../register-types';
import moment from 'moment';

const dayNameMapping: any = {
  Su: 'Su',
  Mo: 'M',
  Tu: 'T',
  We: 'W',
  Th: 'Th',
  Fr: 'F',
  Sa: 'S',
};

const backend_days_mapping: any = {
  Su: 'sun',
  M: 'mon',
  T: 'tue',
  W: 'wed',
  Th: 'thu',
  F: 'fri',
  S: 'sat',
};

let shortDayNames: any = [
  {disable: false, text: 'M'},
  {disable: false, text: 'T'},
  {disable: false, text: 'W'},
  {disable: false, text: 'Th'},
  {disable: false, text: 'F'},
  {disable: false, text: 'S'},
  {disable: false, text: 'Su'},
];

const time_slots: any = [
  '8:00am - 10:00am',
  '10:00am - 1:00pm',
  '1:00pm - 4:00pm',
  '4:00pm - 7:00pm',
  '7:00pm - 10:00pm',
];

const Step4 = ({
  regData,
  handleRegisterData,
}: {
  regData: RegisterationData;
  handleRegisterData: (v: any) => void;
}) => {
  const today = moment(new Date()).format('dd');
  const [currentDay, setCurrentDay] = useState(dayNameMapping[today]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [days, setDays] = useState<string[]>(shortDayNames);

  useEffect(() => {
    const idx = shortDayNames.map((d: any) => d.text).indexOf(currentDay);
    const disabledDays = shortDayNames.slice(0, idx);
    const enabledDays = shortDayNames.slice(idx);
    disabledDays.map((d: any) => (d.disable = true));
    setDays([...disabledDays, ...enabledDays]);
  }, []);

  useEffect(() => {
    if (selectedTimeSlots.length > 0) {
      const copyData: any = {...regData};
      copyData.business_hours[backend_days_mapping[currentDay]] =
        selectedTimeSlots;
      handleRegisterData(copyData);
    }
  }, [selectedTimeSlots, currentDay]);

  return (
    <View style={{marginTop: 30}}>
      <View>
        <View style={{flexDirection: 'row', gap: 5}}>
          <Text style={styles.label}>Signup 4 of 4</Text>
        </View>
        <Text style={styles.welcomeText}>Business Hours</Text>
        <Text style={styles.label}>
          Choose the hours your farm is open for pickups. This will allow
          customers to order deliveries.
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            columnGap: 5,
            marginBottom: 20,
          }}>
          {days.map((day: any, index: any) => (
            <TouchableOpacity
              disabled={day.disable}
              onPress={() => setCurrentDay(day.text)}
              key={index}
              style={{
                ...styles.dayContainer,
                backgroundColor:
                  currentDay === day.text
                    ? '#D5715B'
                    : day.disable
                    ? 'rgba(38, 28, 18, 0.2)'
                    : 'transparent',
                borderColor:
                  currentDay === day.text
                    ? '#D5715B'
                    : day.disable
                    ? 'transparent'
                    : 'rgba(38, 28, 18, 0.2)',
              }}>
              <Text
                style={{
                  ...styles.dayText,
                  color:
                    currentDay === day.text
                      ? '#FFFFFF'
                      : day.disable
                      ? '#000000'
                      : 'rgba(38, 28, 18, 0.2)',
                }}>
                {day.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            gap: 12,
            flexWrap: 'wrap',
            marginTop: 10,
          }}>
          {time_slots.map((time: any, index: any) => (
            <TouchableOpacity
              onPress={() => {
                let timeSlots: any = [...selectedTimeSlots];
                if (timeSlots.includes(time)) {
                  timeSlots = timeSlots.filter((t: any) => t !== time);
                } else {
                  timeSlots = [...timeSlots, time];
                }
                setSelectedTimeSlots(timeSlots);
              }}
              key={index}
              style={{
                ...styles.timeIntervalBtn,
                backgroundColor: selectedTimeSlots.includes(time)
                  ? 'rgba(248, 197, 105, 1)'
                  : 'rgba(38, 28, 18, 0.2)',
              }}>
              <Text style={styles.timeIntervalText}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Step4;

const styles = StyleSheet.create({
  timeIntervalBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: '48%',
    borderRadius: 8,
  },
  timeIntervalText: {
    color: 'rgba(38, 28, 18, 1)',
    fontFamily: 'Be Vietnam',
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 20.45,
    textAlign: 'center',
  },
  dayContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontFamily: 'Be Vietnam',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 20.45,
    textAlign: 'left',
  },
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
