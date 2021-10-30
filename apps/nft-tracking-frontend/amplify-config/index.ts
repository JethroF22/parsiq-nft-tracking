import developmentConfig from './development';

const getConfig = () => {
  switch (process.env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT) {
    case 'development':
      return developmentConfig;
    default:
      return developmentConfig;
  }
};

export default getConfig();
