import React from 'react';
import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFriends } from '../../../redux/userState';
import FlexBetween from '../FlexBetweenHelperComponent/FlexBetween';
import UserImage from '../UserProfileComponent/UserProfilePicture';
import { baseUrl } from '../../../constants/constants';
// eslint-disable-next-line react/prop-types
function Friend({ userPicturePath, friendId, username, isProfile = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const friends = useSelector((state) => state.user.user.friends);
  // checking if friedns comming
  // console.log(friends, 'frendte');
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const isFriend = friends.find((friend) => friend._id === friendId);
  const { main } = palette.neutral;

  const patchFriend = async () => {
    const response = await fetch(`${baseUrl}/user/${_id}/${friendId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage imagePath={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              '&:hover': {
                color: palette.primary.light,
                cursor: 'pointer',
              },
            }}
          >
            {username}
          </Typography>
        </Box>
      </FlexBetween>

      {!isProfile && _id !== friendId && (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
}

export default Friend;
