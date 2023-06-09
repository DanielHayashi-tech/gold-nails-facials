import { Box, Flex, useColorModeValue, VStack } from '@chakra-ui/react';
import { Raleway } from 'next/font/google';
import React from 'react';

const raleway = Raleway({
  weight: ['500', '500'],
  subsets: ['cyrillic'],
});

const AdminDashNavBar = ({ handleFormChange }) => {
  const navBg = useColorModeValue("#ffd4ec", "gray.400");

  const buttonStyles = {
    as: 'button',
    height: '0px',
    lineHeight: '1',
    transition: 'all 0.2s cubic-bezier(4.1,3.2,4.52,1)',
    border: 'none',
    px: '25px',
    borderRadius: '30px',
    fontSize: '20px',
    fontWeight: 'semibold',
    bg: '#cc7eb7',
    color: '#ffffff',
    _hover: { bg: '#e185e6' },
    _active: {
      bg: '#e185e6',
      transform: 'scale(0.98)',
    },
    _focus: {
      boxShadow:
        '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
    },
  };

  return (
    <VStack spacing={4} top="0" w="100%" zIndex="sticky" bg={navBg} position="relative">
      <div className="text-[22px] container flex items-center ">
        <div className={`text-[35px] font-bold ${raleway.className}`}>Golden Nails n Facial</div>
      </div>
      <Flex className="container flex items-end justify-between px-12 py-4 mx-auto" wrap="wrap">

        <Box {...buttonStyles} onClick={() => handleFormChange('addEmployee')}>
          Add New Employee
        </Box>

        <Box {...buttonStyles} onClick={() => handleFormChange('updateEmployee')}>
          Update Employee
        </Box>

        <Box {...buttonStyles} onClick={() => handleFormChange('addEmployeeSkill')}>
          Add Employee Skill
        </Box>

        <Box {...buttonStyles} onClick={() => handleFormChange('updateEmployeeSkill')}>
          Update Employee Skill
        </Box>

        <Box {...buttonStyles} onClick={() => handleFormChange('updateServicePrice')}>
          Update Service
        </Box>

      </Flex>
    </VStack>
  );
};

export default AdminDashNavBar;
