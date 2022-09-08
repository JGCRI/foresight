# Pilot Dashboard for Dash App using GCAM Steel Trade Data:
# Author: TJS 2022
import dash
from dash import dcc
from dash import html
import pandas as pd
import plotly.express as px
from dash.dependencies import Input, Output

data = pd.read_csv('../data/pilot_dashboard_data/Iron_Steel_Trade_data_GCAM6.0.csv', skiprows=1)

app = dash.Dash(__name__)

app.layout = html.Div(
    children=[
        html.H1(
            children="Pilot Dashboard (GCAM Steel Trade)",
        ),
        html.P(
            children="Analyze the behavior of GCAM steel trade values over time"
            " between 1970 and 2018",
        ),
        dcc.Slider(
            min=1970, max=2018, step=1, value=1970,
            marks=None,
            tooltip={"placement": "bottom", "always_visible": True},
            id='year_slider',
        ),
        dcc.Dropdown(
            id="metric_dropdown",
            options={
                'production': 'Production',
                'exports_reval': 'Exports',
                'imports_reval': 'Imports',
                'consumption_reval': 'Consumption',
                'domestic_supply': 'Domestic Supply',
            },
            value='production',
        ),
        dcc.Graph(id="graph"),
    ]
)

@app.callback(
    Output("graph", "figure"),
    [Input("year_slider", "value"),
     Input("metric_dropdown", "value")])
def update_bar_chart(year, metric):
    df = data[data['metric'] == metric]
    mask = df['year'] == year
    df = df[mask].sort_values('value')
    fig = px.bar(df, x="value", y="GCAM_region",
                 width=800, height=700,
                 labels = {
                     "GCAM_region": "GCAM region",
                     "value": "Steel (Mt)",
                 })
    return fig

if __name__ == "__main__":
    app.run_server(debug=True)
