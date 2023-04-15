import { View, Text } from 'react-native'
import React from 'react'
import { Box, Divider, Menu, Pressable } from 'native-base';

const ProfileMenu = ({children}) => {
  return (
    <Box alignItems="center">
      <Menu w="190" trigger={triggerProps => {
      return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              {children}
            </Pressable>;
    }}>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item>Logout</Menu.Item>
        
      </Menu>
    </Box>
  )
}

export default ProfileMenu