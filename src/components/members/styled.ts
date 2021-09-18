import styled from 'styled-components';
import { Button } from 'react-bootstrap'

export const TextField = styled.input`
    height: 32px;
    width: 400px;
    border-radius: 3px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid #e5e5e5;
    padding: 0 32px 0 16px;
`;

export const ClearButton = styled(Button)`
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	height: 34px;
	width: auto;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
`;
