import { LayoutMasterPage } from '../shared/layouts';
import { Box, Paper } from '@mui/material';
import { BarCharts, BarraFerramentas } from '../shared/components';

export const Dashboard = () => {
    return (
        <LayoutMasterPage 
        titulo='Meu Dashboard' 
        barraDeFerramentas={(
            <BarraFerramentas btnNovo={false} btnVoltar={false}  />
          )}
        > 
            <Box gap={1}
                margin={2}
                padding={1}
                paddingX={2}
                height="100%"
                display="flex"
                flexDirection="column"
                alignItems="start"
                component={Paper}>
                    <BarCharts />
            </Box>
        </LayoutMasterPage>
    );
}
