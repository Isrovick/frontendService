import { gql } from "@apollo/client";

export const setGithubCredentials = (id, platformUserName, platformToken) => {
  return gql`mutation{
       setGithubCredentials(userRepositoryInput:{
           idUser:${id},
           platformUserName:"${platformUserName}",
           platformToken:"${platformToken}",
       }){
           idUser
           platformUserName
           platformToken
           platformName
       }
   }`;
};

export const login = (email, password) => {
  return gql`query{
        login(credentials:{
            email:"${email}",
            password:"${password}"})
        {
            user{
                id
                name
                email
                profilePictureUrl
            }
            token
        }
    }`;
};

export const signUp = (name, email, password) => {
  return gql`mutation{
        signUp(userInput:{
            name:"${name}",
            email:"${email}",
            password:"${password}",
        }){
            user{
                id
                name
                email
                profilePictureUrl
            }
            token
        }
    }`;
};

export const findAll = (id) => {
  return gql`query{
    findAll(id:${id}){
    idUser
    name
    url
    owner
    isPrivate
    favourite
    active
    }
    }`;
};

export const setFavourite = (id, name) => {
  return gql`mutation{
        setFavourite(repoSearchInput:{
            idUser:${id},
            name:"${name}"
        }){
            idUser
            name
            isPrivate
            favourite
            active
            owner
        }
    }`;
};
