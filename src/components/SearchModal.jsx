import { View, Text } from 'react-native'
import React from 'react'
import { Button, Modal, FormControl, Input, Center, NativeBaseProvider } from "native-base";
import { useState } from 'react';

const SearchModal = ({show,setShow}) => {
    // const [showModal, setShowModal] = useState(false);
  return (
    <Center>
      {/* <Button onPress={() => setShowModal(true)}>Button</Button> */}
      <Modal isOpen={show} onClose={() => setShow(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Contact Us</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Email</FormControl.Label>
              <Input />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setShow(false);
            }}>
                Cancel
              </Button>
              <Button onPress={() => {
              setShow(false);
            }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  )
}

export default SearchModal