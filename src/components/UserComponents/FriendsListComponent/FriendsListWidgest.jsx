import React, { useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Friend from '../FriendComponent/Friend';
import WidgetWrapper from '../WidgetWrapperHelperComponent/WindgetWrapper';
import { setFriends } from '../../../redux/userState';
import { baseUrl } from '../../../constants/constants';
// eslint-disable-next-line react/prop-types
function FriendsListWidgest({ userId, isProfile = false }) {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.user.token);
  const friends = useSelector((state) => state.user.user.friends);
  console.log(friends);
  const getFriends = async () => {
    const response = await fetch(`${baseUrl}/user/${userId}/friends`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: '1.5rem' }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            username={friend.username}
            userPicturePath={friend.profilePicture}
            isProfile={isProfile}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
}

export default FriendsListWidgest;
