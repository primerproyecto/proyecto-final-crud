import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';
// import './avatarStyles.css';
export const FigureUser = (user) => {
  return (
    <div style={{ display: 'flex', gap: 20 }}>
    <Avatar.Root style={{width: '50px'}}>
     <Avatar.Image
     className="AvatarImage"
        src={user.user.image}
         alt={`Avatar de ${user.user.nombre}`}
      />
      <Avatar.Fallback className="AvatarFallback" delayMs={600}></Avatar.Fallback>
    </Avatar.Root>
    </div>
  );
};
