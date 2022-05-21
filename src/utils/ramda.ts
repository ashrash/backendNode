import * as R from 'ramda';

const nullCheck = (data: any) => R.isNil(data) || R.isEmpty(data);

export {
    nullCheck,
}