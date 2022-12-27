import React, { useState } from 'react';
import { ProfileComponents } from './components';
import { getUser } from '../../store/selector';
import profileIcon from '../../assets/images/profile.png';
import phoneIcon from '../../assets/images/telephone.png';
import emailIcon from '../../assets/images/email.png';

import { useSelector } from 'react-redux';
import { routes } from '../../navigation/routes';

export const Profile = ({ navigation }) => {
  const goBackHome = () => navigation.navigate(routes.HOME);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState('');
  const [updatedInfo, setUpdatedInfo] = useState('');

  const User = useSelector(getUser);
  const onDone = () => {
    console.log('updated ' + updatedInfo);
    closeModal();
  };
  const closeModal = () => {
    setModalVisible(!isModalVisible);
  };
  const editInformation = id => {
    setSelectedInfo(id);
    closeModal();
  };
  const InformationList = [
    {
      id: 'NAME',
      title: 'User Name',
      information: User.NAME,
      icon: profileIcon,
    },
    {
      id: 'PHONE',
      title: 'Phone Number',
      information: User.PHONE,
      icon: phoneIcon,
    },
    {
      id: 'EMAIL',
      title: 'Email Address',
      information: User.EMAIL,
      icon: emailIcon,
    },
  ];
  const props = {
    goBackHome,
    InformationList,
    editInformation,
    isModalVisible,
    selectedInfo,
    onDone,
    setUpdatedInfo,
    closeModal,
  };
  return <ProfileComponents {...props} />;
};
