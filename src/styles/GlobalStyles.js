import { createGlobalStyle } from "styled-components";

let GlobalStyles = createGlobalStyle`

*,*::before,*::after{
    padding:0;
    margin:0;
    box-sizing:inherit
}

:root{
    --color-light-blue:${(props) => props.theme.colors.lightBlue};
    --color-light-pink:${(props) => props.theme.colors.lightPink};
    --color-primary:${(props) => props.theme.colors.black};
    --color-white:${(props) => props.theme.colors.white};
    --color-dark-blue:${(props) => props.theme.colors.darkBlue};
}

html{
    box-sizing:border-box;
    font-size:62.5%;//1rem =10px

    @media ${(props) => props.theme.mediaQuery.normal}{
        font-size:56.25%;
    }
    @media ${(props) => props.theme.mediaQuery.normal1}{
        font-size:50%;
    }
    @media ${(props) => props.theme.mediaQuery.phone}{
        font-size:50%;
    }
}

body{
    font-family:"Montserrat",sans-serif;
    font-weight:400;
    line-height:1.6;
    color:var(--color-primary)
}

button{
    cursor: pointer;
    outline:none;
}

`;

export default GlobalStyles;
