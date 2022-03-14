import { decodeParameters, encodeParameters } from '../../../src/api/parameters_api';
import {
	inValidDecodeParametersData,
	inValidEncodeParametersData,
	validDecodeParametersData,
	validEncodeParametersData,
} from '../../fixtures/data';

describe('parameters_api', () => {
	describe('encodeParameters', () => {
		describe('valid data', () => {
			it.each(validEncodeParametersData)(
				'%#: should pass for valid values: %j',
				({ input: [abi, params], output }) => {
					expect(encodeParameters(abi, params)).toEqual(output);
				},
			);
		});

		describe('invalid data', () => {
			it.each(inValidEncodeParametersData)(
				'%#: should pass for valid values: %j',
				({ input: [abi, params], output }) => {
					expect(() => encodeParameters(abi, params)).toThrow(output);
				},
			);
		});
	});

	describe('decodeParameters', () => {
		describe('valid data', () => {
			it.each(validEncodeParametersData)(
				'%#: should pass for valid values: %j',
				({ input: [abi, bytes], output }) => {
					// Output returns mix of array and object which can't be matched in
					// jest, so have to use stringify+parse to match
					// {
					//   '0': [ '34', '255' ],
					//   '1': [
					//     '42',
					//     '56',
					//     [ '45', '78', propertyOne: '45', propertyTwo: '78' ],
					//     propertyOne: '42',
					//     propertyTwo: '56',
					//     ChildStruct: [ '45', '78', propertyOne: '45', propertyTwo: '78' ]
					//   ],
					//   __length__: 2
					// }
					expect(decodeParameters(abi, output)).toEqual(
						bytes,
					);
				},
			);
		});

		describe('invalid data', () => {
			it.each(inValidDecodeParametersData)(
				'%#: should pass for valid values: %j',
				({ input: [abi, bytes], output }) => {
					expect(() => decodeParameters(abi, bytes)).toThrow(output);
				},
			);
		});
	});
});
