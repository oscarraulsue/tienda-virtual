import { useContext, useState } from 'react';

import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"

import { UiContext } from '../../context/ui/UiContext';
import { useRouter } from 'next/router';


export const SideMenu = () => {

    const router = useRouter();
    const { isMenuOpen, toggleSideMenu } = useContext( UiContext );

    const [searchTerm, setSearchTerm] = useState('');

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        navigateTo(`/search/${ searchTerm }`);
    }

    
    const navigateTo = ( url: string ) => {
        toggleSideMenu();
        router.push(url);
    }


  return (
    <Drawer
        open={ isMenuOpen }
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        onClose={ toggleSideMenu }
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>

                <ListItem>
                    <Input
                        autoFocus
                        value={ searchTerm }
                        onChange={ (e) => setSearchTerm( e.target.value ) }
                        onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={ onSearchTerm }
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>

                <ListItem >
                    <ListItemButton >
                    <ListItemIcon>
                        <AccountCircleOutlined/>
                    </ListItemIcon>
                    
                    <ListItemText primary={'Perfil'} />
                </ListItemButton >
                </ListItem>

                <ListItem >
                    <ListItemButton >
                    <ListItemIcon>
                        <ConfirmationNumberOutlined/>
                    </ListItemIcon>
                    
                    <ListItemText primary={'Mis Ordenes'} />
                </ListItemButton >
                </ListItem>


                <ListItem 
                     
                    sx={{ display: { xs: '', sm: 'none' } }} 
                    onClick={ () => navigateTo('/category/men') }
                >
                    <ListItemButton >
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    
                    <ListItemText primary={'Hombres'} />
                </ListItemButton >
                </ListItem>

                <ListItem 
                     
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={ () => navigateTo('/category/women') }
                >
                    <ListItemButton >
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    
                    <ListItemText primary={'Mujeres'} />
                </ListItemButton >
                </ListItem>

                <ListItem 
                     
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={ () => navigateTo('/category/kid') }
                >
                    <ListItemButton >
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    
                    <ListItemText primary={'Niños'} />
                </ListItemButton >
                </ListItem>


                <ListItem >
                    <ListItemButton >
                    <ListItemIcon>
                        <VpnKeyOutlined/>
                    </ListItemIcon>
                    
                    <ListItemText primary={'Ingresar'} />
                </ListItemButton >
                </ListItem>

                <ListItem >
                    <ListItemButton >
                    <ListItemIcon>
                        <LoginOutlined/>
                    </ListItemIcon>
                    
                    <ListItemText primary={'Salir'} />
                </ListItemButton >
                </ListItem>


                {/* Admin */}
                <Divider />
                <ListSubheader>Admin Panel</ListSubheader>

                <ListItem >
                    <ListItemButton >
                    <ListItemIcon>
                        <CategoryOutlined/>
                    </ListItemIcon>
                    
                    <ListItemText primary={'Productos'} />
                </ListItemButton >
                </ListItem>
                <ListItem >
                    <ListItemButton >
                    <ListItemIcon>
                        <ConfirmationNumberOutlined/>
                    </ListItemIcon>
                    
                    <ListItemText primary={'Ordenes'} />
                </ListItemButton >
                </ListItem>

                <ListItem >
                    <ListItemButton >
                    <ListItemIcon>
                        <AdminPanelSettings/>
                    </ListItemIcon>
                    
                    <ListItemText primary={'Usuarios'} />
                </ListItemButton >
                </ListItem>
            </List>
        </Box>
    </Drawer>
  )
}