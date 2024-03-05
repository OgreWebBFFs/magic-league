import { useHash } from 'react-use';

const parseHash = (hashString) => hashString
  .split('&')
  .filter(Boolean)
  .reduce((paramsObj, singleParam) => {
    const [key, valueStr] = singleParam.split('=');
    return {
      ...paramsObj,
      [`${key}`]: decodeURIComponent(valueStr).split(',')
    }
  }, {});

const hasValidValues = ([_, value]) => value?.length > 0 && value.every((val) => val.length > 0);

export const stringifyHash = (hashObj) => Object.entries(hashObj).filter(hasValidValues).reduce((hashStr, [key, value]) => (
  `${hashStr.length > 0 ? `${hashStr}&` : ''}${key}=${encodeURIComponent([].concat(value).join(','))}`
), "");

const useHashParams = () => {
  const [hash, setHash] = useHash();
  const hashParams = parseHash(hash.replace(/^#/, ''));

  const updateHashParams = (newHashParamsObj) => {
    const newHashString = `#${stringifyHash(newHashParamsObj)}`;
    setHash(newHashString);
    window.history.pushState({ turbolinks: true }, "", newHashString);
  }

  return [hashParams, updateHashParams]
};

export default useHashParams;
