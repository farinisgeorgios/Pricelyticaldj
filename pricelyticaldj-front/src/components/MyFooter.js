import Footer from 'rc-footer';
import React from 'react'
import 'rc-footer/assets/index.css'; // import 'rc-footer/asssets/index.less';
import {SocialMediaIconsReact} from 'social-media-icons-react';


export default function MyFooter(){
    return(
        <Footer
        maxColumnsPerRow={4}
        backgroundColor='#343A40'
        columns={[
            {
              title: 'Pricelytical',
              items: [
                {
                  title: 'Home',
                  url: '/',
                  openExternal: false,
                },
                {
                  title: 'About',
                  url: '/about/',
                  description: 'How to use this tool',
                },
                {
                  title: 'Start Analysis',
                  url: '/analysis/create/',
                },
                {
                  title: 'Contact',
                  url: '/contact/',
                },
                {
                  title: 'Pricing',
                  url: '/pricing/',
                  openExternal: false,
                },
                
              ],
            },
            {
              title: 'User',
              items: [
                {
                  title: 'Profile',
                  url: '/profile/',
                },
                {
                  title: 'Analysis Repository',
                  url: '/analysis/list/',
                },
                {
                  title: 'Log In',
                  url: '/login/',
                },
                {
                  title: 'Sign Up',
                  url: '/signup/',
                },
              ],
            },
            {
              title: 'Contact',
              items: [
                {
                  icon: (
                    <SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="0" borderStyle="solid" icon="phone" iconColor="rgba(246,246,246,1)" backgroundColor="rgba(0,157,170,1)" iconSize="5" roundness="50%" url="https://www.egrowth.gr/" size="18" />                  ),
                  title: '(+30) 6932 523 802',
                  description: 'Phone',
                },
                {
                  icon: (
                    <SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="0" borderStyle="solid" icon="mail" iconColor="rgba(246,246,246,1)" backgroundColor="rgba(0,157,170,1)" iconSize="5" roundness="50%" url="<info@egrowth.gr>" size="18" />                  ),
                  title: <a href = {"mailto:" + "info@egrowth.gr"}>info@egrowth.gr</a>,
                  description: 'Email',
                },
              ],
            },
            {
              
              
              items: [
                {
                  icon: (
                    <SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="0" borderStyle="solid" icon="web" iconColor="rgba(246,246,246,1)" backgroundColor="rgba(0,157,170,1)" iconSize="5" roundness="50%" url="https://www.egrowth.gr/" size="18" />                  ),
                  title: 'Internet Growth',
                  url: 'https://www.egrowth.gr/',
                  description: 'Website',
                  openExternal: true,
                },
                {
                  icon: (
                    <SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="0" borderStyle="solid" icon="facebook" iconColor="rgba(246,246,246,1)" backgroundColor="rgba(0,157,170,1)" iconSize="6" roundness="50%" url="https://www.facebook.com/internetgrowth/" size="18" />                  ),
                  title: 'Facebook',
                  url: 'https://www.facebook.com/internetgrowth/',
                  openExternal: true,
                },
                {
                  icon: (
                    <SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="0" borderStyle="solid" icon="map" iconColor="rgba(246,246,246,1)" backgroundColor="rgba(0,157,170,1)" iconSize="5" roundness="50%" url="https://www.google.com/maps/place/Internet+Growth/@35.2582743,25.6037912,17.92z/data=!4m5!3m4!1s0x0:0xb1db40612c634315!8m2!3d35.2573514!4d25.6036626?shorturl=1" size="18" />                  ),
                  title: 'Location',
                  url: 'https://www.google.com/maps/place/Internet+Growth/@35.2582743,25.6037912,17.92z/data=!4m5!3m4!1s0x0:0xb1db40612c634315!8m2!3d35.2573514!4d25.6036626?shorturl=1',
                  openExternal: true,
                },
              ],
            },
            
          ]}
          bottom="Copyright © 2020 Egrowth. All Rights Reserved."
        />
    )
}


