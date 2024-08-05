import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import Loader from '@/components/Loader';
import PatientProfile from '@/components/PatientProfile';
import { IPatientResponse, IPatientUpdateRequest } from '@/interfaces/Profile';
import { useAppSelector } from '@/redux/hooks';
import { useGetPatientProfileQuery, useUpdatePatientProfileMutation } from '@/services/profile/profileService';

const ProfileScreen = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { data: userProfileResponseData, isFetching: isUserProfileFetching } = useGetPatientProfileQuery();

  const [updatePatientProfile, { isLoading: isUserProfileUpdating }] = useUpdatePatientProfileMutation();

  const [userProfileData, setUserProfileData] = useState<IPatientResponse>({
    name: '',
    contacts: {
      primaryPhone: '',
      alternativePhone: '',
      email: '',
    },
    age: 0,
    gender: '',
    address: '',
    profilePicture: '',
  });

  const handleUserChange = (field: string, value: string) => {
    setUserProfileData((prevData) => ({
      ...prevData,
      [field]: field === 'age' ? parseInt(value, 10) : value,
    }));
  };

  const handleUserContactChange = (field: string, value: string) => {
    setUserProfileData((prevData) => ({
      ...prevData,
      contacts: {
        ...prevData.contacts,
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    if (userProfileResponseData) setUserProfileData(userProfileResponseData);
  }, [userProfileResponseData]);

  const handleUserProfileSave = () => {
    try {
      const payload: IPatientUpdateRequest = {
        name: userProfileData.name,
        age: userProfileData.age,
        gender: userProfileData.gender,
        address: userProfileData.address,
        contacts: {
          primaryPhone: userProfileData.contacts.primaryPhone,
          alternativePhone: userProfileData.contacts.alternativePhone,
        },
        profilePicture: userProfileData.profilePicture,
      };
      updatePatientProfile(payload);
    } catch (error) {
      console.log(error);
    }
  };

  if (isUserProfileFetching || !userProfileData?.contacts?.email || isUserProfileUpdating) return <Loader />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {user?.role === 'Patient' ? (
        <PatientProfile
          userProfileData={userProfileData}
          handleChange={handleUserChange}
          handleContactChange={handleUserContactChange}
          handleSave={handleUserProfileSave}
        />
      ) : (
        <View>
          <Text>Coming Soon...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;
