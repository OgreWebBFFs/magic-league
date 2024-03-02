import { useHash } from 'react-use';
import Turbolinks from 'turbolinks';

const parseHash = (hashString) => hashString
  .split('&')
  .filter(Boolean)
  .reduce((paramsObj, singleParam) => {
    const [key, valueStr] = singleParam.split('=');
    return {
      ...paramsObj,
      [`${key}`]: valueStr.split(',')
    }
  }, {});

const stringifyHash = (hashObj) => Object.entries(hashObj).reduce((hashStr, [key, value]) => (
  `#${hashStr.length > 0 ? `${hashStr}&` : ''}${key}=${value.join(',')}`
), "");

const useHashParams = () => {
  const [hash, setHash] = useHash();
  const hashParams = parseHash(hash.replace(/^#/, ''));

  const updateHashParams = (newHashParamsObj) => {
    const newHashString = stringifyHash(newHashParamsObj);
    setHash(newHashString);
    window.history.pushState({ turbolinks: true }, "", newHashString);
  }

  return [hashParams, updateHashParams]
};

export default useHashParams;
