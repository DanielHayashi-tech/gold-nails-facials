import { Box, Flex, IconButton, useColorModeValue, Icon, Button } from '@chakra-ui/react';
import { Raleway } from 'next/font/google';
import React from 'react';

const raleway = Raleway({
  weight: ['500', '500'],
  subsets: ['cyrillic'],
});

const AdminDashNavBar = ({ handleFormChange }) => {
  const navBg = useColorModeValue('#faf3f7', 'gray.400');

  return (
    <Flex top="0" w="100%" zIndex="sticky" bg={navBg} position="fixed">
      <div className="text-[22px] container flex items-center justify-between px-12 py-4 mx-auto">
        <div className={`text-[35px] font-bold ${raleway.className}`}>Golden Nails n Facial</div>

        <div className="flex space-x-4">
          <Button onClick={() => handleFormChange('addEmployee')}>Add a new Employee</Button>
          <Button onClick={() => handleFormChange('updateServicePrice')}>Update Service Price</Button>
        </div>
      </div>
    </Flex>
  );
};

export default AdminDashNavBar;
