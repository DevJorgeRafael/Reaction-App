import { Avatar, Box, Typography } from "@mui/material"


export const ShowMessage = ({message, user}) => {
  return (
    <>
          {message.sender._id === user._id ? (
              <Box sx={{
                  display: 'flex',

                  justifyContent: 'flex-end',
                  gap: 1,
                  marginBottom: 0.5,
              }}>
                  <Box sx={{
                      backgroundColor: '#99BC85',
                      p: 0.75, borderRadius: '10px 0px 10px 10px',
                      maxWidth: '65%',
                      wordWrap: 'break-word',
                  }}>
                      <Typography variant="body1" color="initial">
                          {message.content}
                      </Typography>
                      <span className="d-flex" style={{ fontSize: '0.8rem', color: '#181818', justifyContent: 'flex-end', marginTop: -5 }}>
                          {new Date(message.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>

                  </Box>
                  <Box>
                      <Avatar src={message.sender.image?.url} alt={message.sender.username} sx={{
                          width: 35,
                          height: 35,

                      }} />
                  </Box>
              </Box>
          ) : (
              <Box sx={{
                  display: 'flex',
                  gap: 1,
                  marginBottom: 0.5,
              }}>
                  <Box>
                      <Avatar src={message.sender.image?.url} alt={message.sender.username} sx={{
                          width: 35,
                          height: 35,
                      }} />
                  </Box>
                  <Box sx={{
                      backgroundColor: '#E5E5EA',
                      p: 0.75, borderRadius: '0px 10px 10px 10px',
                      maxWidth: '65%',
                      wordWrap: 'break-word',
                  }}>
                      <Typography variant="body1" color="initial">
                          {message.content}
                      </Typography>
                      <span className="d-flex" style={{ fontSize: '0.8rem', color: '#181818', marginTop: -5 }}>
                          {new Date(message.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                  </Box>
              </Box>
          )}
    </>
  )
}
