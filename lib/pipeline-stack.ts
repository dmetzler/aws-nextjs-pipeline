import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {CodeBuildStep, CodePipeline, CodePipelineSource} from "aws-cdk-lib/pipelines";
import {NextsJsDeployPipelineStage}  from './pipeline-stage'

export class PipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);


        
        // The basic pipeline declaration. This sets the initial structure
        // of our pipeline
        const pipeline = new CodePipeline(this, 'Pipeline', {
            pipelineName: 'NextJSPipeline',
            synth: new CodeBuildStep('SynthStep', {
                input: CodePipelineSource.connection('dmetzler/aws-nextjs-pipeline','main',{
                    connectionArn:'arn:aws:codestar-connections:eu-west-1:039665761580:connection/0ae15fc7-c2e4-4265-ab52-6d97da2aef92'
                }),
                installCommands: [
                    'npm install -g aws-cdk'
                ],
                commands: [
                    'npm ci',
                    'build-app.sh',
                    'npm run build',
                    'npx cdk synth'
                ]
            }
            )
        });

        
        const deploy = new NextsJsDeployPipelineStage(this, 'Deploy')
        const deployStage = pipeline.addStage(deploy)

     
    }
}