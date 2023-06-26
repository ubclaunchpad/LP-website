const statusColors = {
	1: '#D2AEFF',
	2: '#FFE2F7',
	3: '#D2AEFF',
	4: '#FDAD7F',
	5: '#A9E0FF',
	6: '#E8D094',
	7: '#E8D094',
	8: '#F1FFE5',
	9: '#A1A1A1',
	10: '#E1E1D3'
};

export function getStatusColor(statusId: number) {
	if (!Object.keys(statusColors).includes(statusId.toString())) {
		return '#ffffff';
	} else {
		return statusColors[statusId as keyof typeof statusColors];
	}
}
